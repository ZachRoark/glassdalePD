import { useConvictions, getConvictions } from "./ConvictionProvider.js";

/*
    Which element in your HTML contains all components?
    That's your Event Hub. Get a reference to it here.
*/

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".filters__crime");

// On the event hub, listen for a "change" event.

eventHub.addEventListener("change", (event) => {
    if (event.target.id === "crimeSelect") {
        const customEvent = new CustomEvent("crimeChosen", {
        detail: {
            crimeThatWasChosen: event.target.value,
            },
        });
    eventHub.dispatchEvent(customEvent);
    }
});

const render = (convictionsCollection) => {
    const sortedArray = convictionsCollection.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
    });
    contentTarget.innerHTML = `
            <select class="dropdown" id="crimeSelect">
                <option value="0">Please select a crime...</option>
                ${sortedArray.map((crimeObj) => {
                    return `<option>${crimeObj.name}</option>`;
                })}
            </select>
        `;
};

export const ConvictionSelect = () => {
    getConvictions().then(() => {
        const convictionsArray = useConvictions();
        render(convictionsArray);
    });
};