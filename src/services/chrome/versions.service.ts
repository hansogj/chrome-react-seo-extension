import { PaginatedVersions, Version } from "../../domain";
import * as api from "./api";
/* 
const removeAllWantedVersionsOfItem = async (
  versions_url: string,
  // wantListResource: string,
  format?: Version["format"]
) =>
  getAllWantedVersionsOfItem(versions_url)
    .then((allVersions) =>
      format
        ? allVersions.filter((version) =>
            version.major_formats.includes(format)
          )
        : allVersions
    )
    .then((all) =>
      all
        // .filter((_, i) => i < 20)
        .map(({ id, resource_url }: Version, i) => {
          // const interval = i > 0 && i % 60 === 0 ? 60 * 1000 : 1;
          const interval = 2000;
          return new Promise((resolve, reject) => {
            setTimeout(
              () => {
                console.log(resource_url);
                return resolve(resource_url);
              },
              //              () => api.fetch(resource_url).then(resolve).catch(reject),
              // api.deleteResource(`${wantListResource}/${id}`)
              interval
            );
          });
        })
    ); */
const getAllWantedVersionsOfItem = async (versions_url: string) =>
  getAllVersions(versions_url).then((all) =>
    all.filter((it) => Boolean(it.stats.user.in_wantlist))
  );

const getAllVersions = async (
  versions_url: string,
  page = 1,
  result = [] as Version[]
): Promise<Version[]> =>
  (
    api.fetch(versions_url, {
      per_page: 100,
      page,
    }) as Promise<PaginatedVersions>
  ).then(({ pagination, versions }) =>
    page < pagination.pages
      ? getAllVersions(versions_url, page + 1, result.concat(versions))
      : Promise.resolve(result.concat(versions))
  );

const versionsService = () => {
  return {
    getAllVersions,
    getAllWantedVersionsOfItem,
    // removeAllWantedVersionsOfItem,
  };
};

export default versionsService;
