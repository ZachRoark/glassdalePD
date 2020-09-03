let criminals = [];

export const useCriminals = () => {
  return criminals.slice();
};

export const getCriminals = () => {
    return fetch("https://criminals.glassdale.us/criminals")
        .then((response) => response.json())
        .then((parsedCriminals) => {
            console.log("test1")
            console.table(parsedCriminals);
            criminals = parsedCriminals;
        }
    )
}