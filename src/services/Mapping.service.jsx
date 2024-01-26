const MappingService = () => {
  const TransformDate = (string) => {
    const fecha = new Date(Date.parse(string));
    let day = String(fecha.getDate()).padStart(2, "0");
    let month = String(fecha.getMonth() + 1).padStart(2, "0");
    let year = fecha.getFullYear();
    return fecha != null ? [day, month, year].join("-") : "";
  };
  const TransformStringToDate = (string) => {
    const fecha = new Date(Date.parse(string));
    let day = String(fecha.getDate()).padStart(2, "0");
    let month = String(fecha.getMonth() + 1).padStart(2, "0");
    let year = fecha.getFullYear();
    return fecha != null ? [day, month, year] : [0, 0, 0];
  };
  const TransformList = (list) => {
    if (list == null) return [];
    var array = Array.from(list);
    var newList = array.map((item) => {
      return {
        id: item.id,
        label: item.name,
      };
    });

    return newList;
  };

  return {
    TransformDate,
    TransformList,
    TransformStringToDate,
  };
};
export default MappingService;
