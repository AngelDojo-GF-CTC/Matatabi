// 配列の中からkeyが一致する要素をまとめる関数
export const groupsArrayByKey = (array, key, sortKey) =>
  array.reduce((groups, currentValue) => {
    (groups[currentValue[key]] = groups[currentValue[key]] || []).push(
      currentValue
    );
    sortKey &&
      groups[currentValue[key]].sort((a, b) =>
        a[sortKey] > b[sortKey] ? 1 : -1
      );
    return groups;
  }, {});
