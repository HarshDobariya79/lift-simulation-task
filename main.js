const initializeFloors = () => {
    const numberOfFloors = document.querySelector('#floors').value;
    const numberOfLifts = document.querySelector('#lifts').value;

    const main_container = document.querySelector("#main-container");
    main_container.innerHTML = "";

    for (let i = numberOfFloors; i > 0; i--) {

        // Create floor element
        const floor = document.createElement("div");
        floor.style.display = "flex";
        floor.style.justifyContent = "space-between";
        floor.style.alignItems = "center";
        floor.style.width = "100%";
        floor.style.height = "120px";
        floor.style.borderBottom = "3px solid gray";
        floor.classList.add("floor");
        floor.setAttribute("data-floor", i.toString());

        // Create up and down buttons for the floor
        const controllerButtons = document.createElement("div");
        controllerButtons.style.marginLeft = "20px";
        controllerButtons.style.marginRight = "20px";
        controllerButtons.style.display = "flex";
        controllerButtons.style.flexDirection = "column";
        controllerButtons.style.justifyContent = "center";

        const upArrowButton = document.createElement("button");
        upArrowButton.style.margin = "1px"
        upArrowButton.style.border = "none"

        const upArrowIcon = document.createElement("img");
        upArrowIcon.style.userSelect = "none";
        upArrowIcon.style.moz
        upArrowIcon.src = "up-arrow.png";
        upArrowIcon.style.width = "12px";
        upArrowIcon.style.padding = "3px"
        upArrowButton.appendChild(upArrowIcon);

        const downArrowButton = document.createElement("button");
        downArrowButton.style.margin = "1px"
        downArrowButton.style.border = "none"

        const downArrowIcon = document.createElement("img");
        downArrowIcon.style.userSelect = "none";
        downArrowIcon.src = "down-arrow.png";
        downArrowIcon.style.width = "12px";
        downArrowIcon.style.padding = "3px"
        downArrowButton.appendChild(downArrowIcon);

        controllerButtons.appendChild(upArrowButton);
        controllerButtons.appendChild(downArrowButton);

        // Add lifts to the 1st floor by default
        if (i == 1) {
            const liftContainer = document.createElement('div');
            liftContainer.style.display = "flex";
            liftContainer.style.justifyContent = "space-evenly";
            liftContainer.appendChild(controllerButtons);
            for (let j = 0; j < numberOfLifts; j++) {
                const lift = document.createElement('div');
                lift.style.height = "100px";
                lift.style.width = "70px";
                lift.style.margin = "10px";
                lift.style.backgroundColor = "#4CAF50";
                lift.setAttribute('data-lift', j.toString());
                lift.setAttribute('data-status', 'Available');

                lift.setAttribute('data-lift', i);
                liftContainer.appendChild(lift);
            }
            floor.appendChild(liftContainer);
        } else {
            floor.appendChild(controllerButtons);
        }

        const floorNum = document.createElement('div');
        floorNum.innerText = `Floor ${i}`;
        floorNum.style.fontWeight = "bold";
        floor.appendChild(floorNum);

        main_container.appendChild(floor);
    }
}