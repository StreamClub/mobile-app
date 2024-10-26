export function shuffleTwoLists(list1: any[], list2: any[]) {
    const combinedList = [...list1, ...list2];

    for (let i = combinedList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedList[i], combinedList[j]] = [combinedList[j], combinedList[i]];
    }
  
    return combinedList;
  }