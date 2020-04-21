const setCookie = (key, value, path = '/') => {
    document.cookie = key + '=' + encodeURIComponent(value) + ';path=' + path;
};

const getCookie = () => {
    let output = {};
    document.cookie.split(/\s*;\s*/).forEach((pair) => {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair[1];
    });
    return output;
};

const toggle_classes = (element, class1, class2) => {
    if (element.classList.contains(class1)) {
        element.classList.remove(class1);
        element.classList.add(class2);
    } else {
        element.classList.remove(class2);
        element.classList.add(class1);
    }
};

const touchesAreEqual = (t1, t2, epsilon = 5) => {
    if(Math.abs(t2.clientX - t1.clientX) <= epsilon &&
       Math.abs(t2.clientY - t1.clientY) <= epsilon)
       return true;
    return false;
};

// use as:
// await sleep(2000);
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
