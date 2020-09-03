import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTML } from './Criminal.js'
import { OfficerSelect } from '../officers/OfficerSelect.js';
import { OfficerList } from '../officers/OfficerList.js';

export const CriminalList = () => {
    getCriminals().then(() => {
        const criminalArray = useCriminals();
        render (criminalArray);
        }
    )
}


const eventHub = document.querySelector(".container");

eventHub.addEventListener("crimeChosen", (event) => {
    if (event.detail.crimeThatWasChosen !== "0") {
        const matchingCriminals = useCriminals().filter((criminalObj) => {
            return criminalObj.conviction === event.detail.crimeThatWasChosen;
        });
        render(matchingCriminals);
        }
});
// o0o0o0o0o0o0oo0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o00oo0o0
// Had issues adding OfficerSelected to OfficerList, don't wanna 
// worry about it if it works here.
// o0o0o0o0o0o0oo0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o00oo0o0
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
// o0o0o0o0o0o0oo0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o00oo0o0
const render = (criminalCollection) => {
    const contentTarget = document.querySelector(".criminalsContainer");
    let HTMLArray = criminalCollection.map((criminalObj) => {
        return CriminalHTML(criminalObj);
    });
    contentTarget.innerHTML = HTMLArray.join("");
};

