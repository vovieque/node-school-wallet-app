import {helloHandler} from './handlers';

const component = () => {
	const HELLO_NODE_SCHOOL_APP = 'Hello, Node School App!';
	const element = document.createElement('div');

	element.innerHTML = HELLO_NODE_SCHOOL_APP;
	element.addEventListener('click', () => helloHandler(HELLO_NODE_SCHOOL_APP));

	return element;
};

document.body.appendChild(component());
