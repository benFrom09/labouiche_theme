function array_check(array = [], value) {
    let front = 0;
    let back = array.length - 1;
    while (back > front) {
      while (array[front] != value) {
        front++;
        continue;
      }
      while (array[back] != value) {
        back--;
        continue;
      }
      if (array[front] != value || array[back] != value) return false;
      front++;
      back--;
    }
    return true;
  }