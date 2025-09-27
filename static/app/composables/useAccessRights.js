export const useAccessRights = () => {
  const isAllow = async (key) => {
    const dbName = useCookie("dbname");
    if (!dbName.value) return undefined;
    await useIndexedDB().connect(dbName.value, 1);
    const response = await useIndexedDB().read("settings", "access_rights");
    return response[key];
  };

  return {
    isAllow,
  };
};
