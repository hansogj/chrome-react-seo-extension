import axios, { AxiosResponse } from "axios";

const token = "secret-token"; // to be found in https://www.discogs.com/settings/developers
const discogsBaseUrl = "https://api.discogs.com";

const unRest = ({ data }: AxiosResponse) => data;

export const fetchArtist = async (artist: string) =>
  axios
    .get(`${discogsBaseUrl}/database/search?q=${artist}&token=${token}`)
    .then(unRest)
    .then(({ results }) =>
      results.map(({ id, resource_url, title, type, uri }: any) => ({
        id,
        resource_url,
        title,
        type,
        uri,
      }))
    )
    .then((e) => {
      console.log(e);
      return e;
    });

export const fetchUser = async (user: string) =>
  axios
    .get(`${discogsBaseUrl}/oauth/identity?token=${token}`)
    .then((e) => axios.get(`${discogsBaseUrl}/users/${user}?token=${token}`))
    .then(unRest);

export const fetchFolders = async (user: string) =>
  fetchUser(user)
    .then(({ collection_folders_url }) => collection_folders_url)
    .then((url) => axios.get(url + "?token=" + token));
