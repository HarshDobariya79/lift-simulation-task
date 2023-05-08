const main_container = document.querySelector("#main-container");

const generateUI = () => {
  const numberOfFloors = document.querySelector("#floors").value;
  const numberOfLifts = document.querySelector("#lifts").value;

  // Empty main container
  main_container.innerHTML = "";

  // Create floors, lifts, controls and floor numbers
  for (let i = numberOfFloors; i > 0; i--) {
    // Create floor element
    const floor = document.createElement("div");
    floor.style.display = "flex";
    floor.style.justifyContent = "space-between";
    floor.style.alignItems = "center";
    // floor.style.width = "100%";
    floor.style.height = "120px";
    floor.style.borderBottom = "2px solid gray";
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
    upArrowButton.setAttribute("data-floor", i.toString());
    upArrowButton.classList.add("upArrow", "callButton");
    upArrowButton.style.margin = "1px";
    upArrowButton.style.border = "none";

    const upArrowIcon = document.createElement("img");
    upArrowIcon.style.userSelect = "none";
    upArrowIcon.src = "up-arrow.png";
    upArrowIcon.style.width = "12px";
    upArrowIcon.style.padding = "3px";
    upArrowButton.appendChild(upArrowIcon);

    const downArrowButton = document.createElement("button");
    downArrowButton.setAttribute("data-floor", i.toString());
    downArrowButton.classList.add("downArrow", "callButton");
    downArrowButton.style.margin = "1px";
    downArrowButton.style.border = "none";

    const downArrowIcon = document.createElement("img");
    downArrowIcon.style.userSelect = "none";
    downArrowIcon.src = "down-arrow.png";
    downArrowIcon.style.width = "12px";
    downArrowIcon.style.padding = "3px";
    downArrowButton.appendChild(downArrowIcon);

    controllerButtons.appendChild(upArrowButton);
    controllerButtons.appendChild(downArrowButton);

    // Add lifts to the 1st floor by default
    if (i == 1) {
      const liftContainer = document.createElement("div");
      liftContainer.style.display = "flex";
      liftContainer.style.justifyContent = "space-evenly";
      liftContainer.appendChild(controllerButtons);

      // create lifts
      for (let j = 0; j < numberOfLifts; j++) {
        const lift = document.createElement("div");
        lift.style.display = "flex";
        lift.style.justifyContent = "space-between";
        lift.style.alignItems = "center";
        lift.style.height = "100px";
        lift.style.width = "70px";
        lift.style.margin = "10px";
        lift.style.backgroundColor = "#026C7C";
        lift.classList.add("lift");
        lift.setAttribute("data-current", 1);
        lift.setAttribute("data-status", "Available");
        lift.setAttribute("data-lift", j);
        lift.style.transitionDuration = "2.5s";
        lift.style.transitionTimingFunction = "ease-in-out";
        lift.style.transitionProperty = "transform";

        // create doors
        const leftDoor = document.createElement("div");
        leftDoor.classList.add("door", "leftDoor");
        leftDoor.style.transition = "width 2s";
        leftDoor.style.width = "30px";
        leftDoor.style.height = "90px";
        leftDoor.style.margin = "5px";
        leftDoor.style.marginRight = "1px";
        leftDoor.style.backgroundColor = "#1C1F33";

        const rightDoor = document.createElement("div");
        rightDoor.classList.add("door", "rightDoor");
        rightDoor.style.transition = "width 2.5s";
        rightDoor.style.width = "30px";
        rightDoor.style.height = "90px";
        rightDoor.style.margin = "5px";
        rightDoor.style.marginLeft = "1px";
        rightDoor.style.backgroundColor = "#1C1F33";

        lift.appendChild(leftDoor);
        lift.appendChild(rightDoor);

        liftContainer.appendChild(lift);
      }
      floor.appendChild(liftContainer);
    } else {
      floor.appendChild(controllerButtons);
    }

    // add floor number to each floor
    const floorNum = document.createElement("div");
    floorNum.innerText = `Floor ${i}`;
    floorNum.style.fontWeight = "bold";
    floor.appendChild(floorNum);

    main_container.appendChild(floor);
  }
};

const startSimulation = () => {
  generateUI();

  // add event listeners to all call buttons
  const liftQueue = [];
  const callButtons = document.getElementsByClassName("callButton");
  for (let i = 0; i < callButtons.length; i++) {
    callButtons[i].addEventListener("click", function () {
      liftQueue.push(parseInt(callButtons[i].getAttribute("data-floor")));
    });
  }

  const moveLift = (lift, target, distance) => {
    lift.setAttribute("data-status", "Occupied");
    lift.style.transitionDuration = `${distance * 2}s`;
    lift.style.transform = `translateY(-${122 * (target - 1)}px)`;
    lift.setAttribute("data-current", target);
    setTimeout(() => {
      lift.getElementsByClassName("leftDoor")[0].style.width = "5px";
      lift.getElementsByClassName("rightDoor")[0].style.width = "5px";
    }, distance * 2000);
    setTimeout(() => {
      lift.getElementsByClassName("leftDoor")[0].style.width = "30px";
      lift.getElementsByClassName("rightDoor")[0].style.width = "30px";
    }, distance * 2000 + 2500);
    setTimeout(() => {
      lift.setAttribute("data-status", "Available");
    }, distance * 2000 + 5000);
  };

  const lifts = Array.from(document.querySelectorAll(".lift"));

  setInterval(() => {
    if (liftQueue.length > 0) {
      const availableLifts = lifts.filter(
        (lift) => lift.getAttribute("data-status") == "Available"
      );

      if (availableLifts.length > 0) {
        const targetFloor = liftQueue.shift();

        let liftElement;
        let liftDistance = lifts.length + 1;
        for (let i = 0; i < availableLifts.length; i++) {
          if (
            Math.abs(
              parseInt(availableLifts[i].getAttribute("data-current")) -
                targetFloor
            ) < liftDistance
          ) {
            liftDistance = Math.abs(
              parseInt(availableLifts[i].getAttribute("data-current")) -
                targetFloor
            );
            liftElement = availableLifts[i];
          }
        }
        moveLift(liftElement, targetFloor, liftDistance);
      }
    }
  }, 50);
};
