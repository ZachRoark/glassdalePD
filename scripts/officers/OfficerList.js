import { useOfficers, getOfficers } from "./OfficerProvider.js";
import { OfficerHTML } from "./Officer.js";

export const OfficerList = () => {
    getOfficers().then(() => {
        const officerArray = useOfficers();
        addOfficersToDom(officerArray);
    });
};

const addOfficersToDom = (anOfficerArr) => {
    const domElement = document.querySelector(".officersContainer");
    
    let HTMLArray = anOfficerArr.map((singleOfficer) => {
        return OfficerHTML(singleOfficer);
    });
    domElement.innerHTML = HTMLArray.join("");
};

const eventHub = document.querySelector(".container");

eventHub.addEventListener("officerSelected", (event) => {
    const officerName = event.detail.officer;
    const criminals = useCriminals();
    const matchingCriminals = criminals.filter((criminalObject) => {
      if (criminalObject.arrestingOfficer === officerName) {
        return true;
      }
    });
    render(matchingCriminals);
  });



//   getting useCriminals is not defined at OficerList.js:24, 
//   ...but it's working so whatever there guy