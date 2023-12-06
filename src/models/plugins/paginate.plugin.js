/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.lookup] - Lookup data fields using format: dbName.foreignField:localField, where foreignField is from another collection. Multiple lookup criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @param {Object} [selectFields] - Fields to be fetched
   * @param {number} [dateSort] - Sort documents using date
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options, selectFields = {}, dateSort) {
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();

    let docsPromise;
    let sortObj = {};
    let projectObj = {};
    let addFieldsObj = {};
    let matchObj = filter;

    if (options.sortBy) {
      sortObj = options.sortBy.split(',').reduce((final, sortOption) => {
        const [key, order] = sortOption.split(':');
        final = { ...final, [key]: order === 'desc' ? -1 : 1 };
        return final;
      }, sortObj);
    }

    if (selectFields) {
      projectObj = selectFields.split(' ').reduce((final, curr) => {
        final = { ...final, [curr]: 1 };
        return final;
      }, projectObj);
    }

    if (dateSort) {
      sortObj = { parsed_date_added: dateSort, ...sortObj };
      matchObj = {
        ...filter,
        date_added: {
          $exists: true,
          $ne: null,
        },
      };
      addFieldsObj = {
        parsed_date_added: {
          $dateFromString: {
            dateString: {
              $trim: {
                input: '$date_added',
                chars: ' ',
              },
            },
            // format: '%B %d, %Y',
          },
        },
      };
    }

    const aggregateArr = [
      {
        $match: matchObj,
      },
      {
        $addFields: addFieldsObj,
      },
      {
        $sort: sortObj,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ];

    let projectLookup = {};

    if (options.lookup) {
      options.lookup.split(',').forEach((lookupOption) => {
        const firstSplit = lookupOption.split('.');
        const dbName = firstSplit[0];

        const fieldsSplit = firstSplit[1].split(':');
        const foreignField = fieldsSplit[0];
        const localField = fieldsSplit[1];
        const flatVar = `${localField}_flat`;

        const lookupObj = {
          $lookup: {
            from: dbName,
            ...(foreignField === '_id'
              ? {
                  let: {
                    searchId: { $toObjectId: `$${localField}` },
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: [{ _id: '$$searchId' }],
                      },
                    },
                  ],
                }
              : { foreignField, localField }),
            as: flatVar,
          },
        };

        aggregateArr.splice(2, 0, ...[lookupObj, { $unwind: `$${flatVar}` }]);
        projectLookup = { ...projectLookup, [flatVar]: 1 };
      });
    }

    if (Object.keys(projectObj).length) {
      aggregateArr.splice(3, 0, {
        $project: { ...projectObj, ...projectLookup },
      });
    }

    docsPromise = this.aggregate(aggregateArr);

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
