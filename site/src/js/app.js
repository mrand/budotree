import cytoscape from 'cytoscape';
import elk from 'cytoscape-elk';
import cola from 'cytoscape-cola';
import cise from 'cytoscape-cise';
import $ from 'jquery';

cytoscape.use( elk );
cytoscape.use( cola );
cytoscape.use( cise );


import data from './tree.json';
console.log(data);


const style = [ // the stylesheet for the graph
    {
	selector: 'node',
	style: {
	    'label': 'data(name)',
	    'font-size': '0.5em',
	    'font-family': 'Cormorant Garamond, serif',
	    'font-family': 'Noto Serif, serif',
	    'color': 'white',//'#BC002D',
	    'text-valign': 'center',
	    'text-halign' : 'center',
	    'shape': 'ellipse',
	    'text-wrap': 'wrap',
	    'text-max-width': 40,
	    'width': 55,
	    'height': 55,
	    'background-color': "black",
	    'border-width':'1',
	    //'border-color':'white'
	    
	}
    },
    {
	selector: 'edge',
	style: {
	    'width': 1,
	    'line-style': 'solid',
	    'curve-style': 'bezier',
	    'control-point-step-size': '40',
	    'taxi-direction': 'auto',
	    'line-color': '#888',
	    label: 'data(interaction)',
	    'font-size': '0.4em',
	    //	    'font-family': 'Cormorant Garamond, serif',
	    'font-family': 'Noto Serif JP, serif',
	    'font-weight': '700',
	    'text-wrap': 'wrap',
	    'text-max-width': 35,	
	    'color': '#444',
	    'source-arrow-shape': 'vee',
	    'arrow-scale':'0.9',
	    'source-arrow-color': '#666',
	    
	    
	}
    },
    {
	selector: ':selected',
	css: {
            'background-color':  '#cb4042',//'#BC002D',
	    'color': 'white',
	}
    }
];

var lllayout = {
    name: 'elk',
    spacingFactor: 1,
    nodeDimensionsIncludeLabels: true,
    elk: {
	algorithm: 'mrtree',
	'elk.direction': 'UP',
	'elk.spacing.nodeNode': '40',
	'elk.spacing.edgeNode': '50',
	'elk.animate': 'end'
    }
};

var layoutOptions = {
    name: 'breadthfirst',
    spacingFactor: 1,
    nodeDimensionsIncludeLabels: true,
    animate: 'end',
    animationDuration: 200,
    elk: {
	algorithm: 'mrtree',
    }
};


var cy = cytoscape({
    container: $('#cy'), // container to render in
    elements: data.elements,
    style: style,    
    wheelSensitivity: 0.1
});

var layout = cy.layout(layoutOptions);

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded, running layout");
    
    layout = cy.layout(layoutOptions);
    layout.run();
    console.log(layout);
    // cy.nodes('[id = "JDP-1"]').style('background-color', '#BC002D');
    // cy.nodes('[id = "JDP-1"]').style('color', 'white');
    // cy.nodes('[id = "JDP-1"]').style('color', 'white');
    cy.nodes('[id = "JDP-1"]').select();    
    
});

function goHome() {
    console.log("Going home...");
    cy.nodes('[id = "JDP-1"]').select();
    cy.center();
    layout.run();
}

function layoutElkMrTree() {
    layoutOptions["name"]="elk";
    layoutOptions["elk"]["algorithm"] = "mrtree";
    layout = cy.layout(layoutOptions);    
    cy.layout(layoutOptions);
    console.log( layoutOptions["name"]);
    cy.center();
    layout.run();
}

function layoutElkLayered() {
    layoutOptions["name"]="elk";
    layoutOptions["elk"]["algorithm"] = "layered";
    layout = cy.layout(layoutOptions);    
    cy.layout(layoutOptions);
    console.log( layoutOptions["name"]);    
    layout.run();
} 

function layoutStress() {
    layoutOptions["name"]="elk";
    layoutOptions["elk"]["algorithm"] = "stress";
    layout = cy.layout(layoutOptions);    
    console.log( layoutOptions["name"]);
    cy.layout(layoutOptions);    
    layout.run();       
}


function layoutCola() {
    layoutOptions["name"]="cola";
    cy.layout(layoutOptions);
    layout = cy.layout(layoutOptions);    
    console.log( layoutOptions["name"]);        
    layout.run();    
}

function layoutCise() {
    layoutOptions["name"]="cise";
    cy.layout(layoutOptions);
    layout = cy.layout(layoutOptions);    
    console.log( layoutOptions["name"]);        
    layout.run();    
}

function layoutBreadthfirst() {
    layoutOptions["name"]="breadthfirst";
    cy.layout(layoutOptions);
    layout = cy.layout(layoutOptions);    
    console.log( layoutOptions["name"]);        
    layout.run();    
}

// document.getElementById ("layout-change-mrtree").addEventListener ("click", layoutElkMrTree, false);
// document.getElementById ("layout-change-layered").addEventListener ("click", layoutElkLayered, false);
// document.getElementById ("layout-change-breadthfirst").addEventListener ("click", layoutBreadthfirst, false);
// document.getElementById ("layout-change-stress").addEventListener ("click", layoutStress, false);
// document.getElementById ("layout-change-cola").addEventListener ("click", layoutCola, false);
// document.getElementById ("layout-change-cise").addEventListener ("click", layoutCise, false);




function onChange() {
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    console.log(value, text);
    switch(e.value) {
    case "mrtree":
	layoutOptions["name"]="elk";
	layoutOptions["elk"]["algorithm"] = "mrtree";
	break;
    case "layered":
	layoutOptions["name"]="elk";
	layoutOptions["elk"]["algorithm"] = "layered";	
	break;
    case "breadthfirst":
	layoutOptions["name"]="breadthfirst";
	break;	
    case "stress":
	layoutOptions["name"]="elk";
	layoutOptions["elk"]["algorithm"] = "stress";	
	break;
    case "cise":
	layoutOptions["name"]="cise";
	break;
    case "cola":
	layoutOptions["name"]="cola";
	break;		
    }

    
    layout = cy.layout(layoutOptions);    
    cy.layout(layoutOptions);
    console.log( layoutOptions["name"]);
    layout.run();	    
    
}
var e = document.getElementById("ddlViewBy");
e.onchange = onChange;
onChange();


var homeBtn = document.getElementById("home");
homeBtn.addEventListener("click", goHome);

var distance = document.getElementById("distance");

function setDistance(distance) {
    
    layoutOptions["spacingFactor"] = distance;
    layout = cy.layout(layoutOptions);    
    cy.layout(layoutOptions);
    console.log( layoutOptions["name"]);
    cy.center();
    layout.run();
}

distance.addEventListener("change", function () {
    var distanceDisplay = document.getElementById("distanceDisplay");    
    console.log(document.getElementById("distance").textContent = distance.value);
    setDistance(distance.value);
   // distanceDisplay.innerHTML = distance.value;
    
});


import bulmaSlider from 'bulma-slider';
bulmaSlider.attach();
// Popper stuff

import popper from "cytoscape-popper";
cytoscape.use(popper);

cy.elements().unbind("mouseover");
/*
cy.elements().bind("mouseover", (event) => {
    event.target.popperRefObj = event.target.popper({
	content: () => {
	    let content = document.createElement("div");
	    var nativeName = document.createElement("p");
	    var img = document.createElement("img");
	    var desc = document.createElement("p");

	    content.classList.add("popper-div");

	    img.src = "https://upload.wikimedia.org/wikipedia/commons/0/0c/Kano_Jigoro.jpg";
	    img.width = 100;
	    content.appendChild(img);

	    if (event.target.isNode()) {
		nativeName.innerHTML = event.target.data().native_name;
		content.appendChild(nativeName);
		//content.innerHTML = event.target.data().native_name;
	    } else {
		content.innerHTML = event.target.data().place;
	    }
	    
	    desc.innerHTML = event.target.data().description;
	    content.appendChild(desc);
	    
	    console.log(content.innerHTML);
	    document.body.appendChild(content);
	    return content;
	},
    });
});


cy.elements().unbind("mouseout");
cy.elements().bind("mouseout", (event) => {
    if (event.target.popper) {
	event.target.popperRefObj.state.elements.popper.remove();
	event.target.popperRefObj.destroy();
    }
});

*/

// cy.elements().unbind("mouseout");
// cy.elements().bind("mouseout", (event) => {
//     if (event.target.popper) {
// 	event.target.popperRefObj.state.elements.popper.remove();
// 	event.target.popperRefObj.destroy();
//     }
// });

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}


var info = document.getElementById("info");
var cardTitle = document.getElementById("card-title");
var jsonMakeHTML = require('json-make-html');
var jsargs = {
        separator : ': ',
        iterator : 3,
        wrapper : {
            before : '',
            class : 'jsonhtml',
            elem : 'ul',
            after : ''
        },
        child : {
            before : '',
            class : 'jsonhtml__singlechild',
            elem : 'li',
            titleClass : 'jsonhtml__parent',
            titleElem : 'p',
            after : ''
        },
        css :{
            title : '',//'margin: 9px 0 0;color:#BA584C;',
            wrapperElem : '',
            childElem : '',//'list-style-type:none;',
            childElemNested : 'margin-left: 18px;'
        }

    };



cy.elements().bind("tap", (event) => {
    
    let content = document.createElement("div");
    var nativeName = document.createElement("p");
    var img = document.createElement("img");
    var desc = document.createElement("p");


    //content.classList.add("popper-div");
    
    //img.src = "https://upload.wikimedia.org/wikipedia/commons/0/0c/Kano_Jigoro.jpg";
    
    if (event.target.isNode()) {
	if (event.target.data().photo_url) {
	    img.src = event.target.data().photo_url;
	    img.width = 100;
	    content.appendChild(img);
	}
	// if (event.target.data().native_name) {
	//     nativeName.innerHTML = event.target.data().native_name;
	//     content.appendChild(nativeName);	    
	// }	
	//content.innerHTML = event.target.data().native_name;
    } else {
	content.innerHTML = event.target.data().place;
    }

    if (event.target.data().description) {
	desc.innerHTML = event.target.data().description;
	content.appendChild(desc);
    }
    // Prettify the raw JSON

    for (var i = 0; i < event.target.data().teachers.length; i++) {
	console.log(event.target.data().teachers[i]);
	for (let person of data.elements.nodes) {
	    if (person.data.id == event.target.data().teachers[i].id) {
		console.log(person.data.name);
		event.target.data().teachers[i]["name"] = person.data.name;
		console.log(event.target.data().teachers[i]);
	    }
	}
    }
    console.log(event.target.data());
    var html = jsonMakeHTML.make(event.target.data(),jsargs);
    desc.innerHTML = html;
    content.appendChild(desc);
    //document.body.appendChild(content);
    info.innerHTML = content.innerHTML;
    cardTitle.innerHTML = event.target.data().name;

});

document.addEventListener('DOMContentLoaded', function() {
	let cardToggles = document.getElementsByClassName('card-toggle');
	for (let i = 0; i < cardToggles.length; i++) {
		cardToggles[i].addEventListener('click', e => {
		    e.currentTarget.parentElement.parentElement.childNodes[3].classList.toggle('is-hidden');
		});
	}
});



document.addEventListener('DOMContentLoaded', function() {
    let lineType = document.getElementById("lineType");
    lineType.addEventListener('click', e => {
	console.log(style[1]["style"]["curve-style"]);
	if (e.target.checked) {
	    cy.style()
		.selector('edge')
		.style({
		    'curve-style': 'bezier'
		}).update();
	} else {
	    cy.style()
		.selector('edge')
		.style({
		    'curve-style': 'taxi'
		}).update();
	}})});
			     

// navbar burguer
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

// Link preview
