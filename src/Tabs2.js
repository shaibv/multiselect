const template = document.createElement("template");

const css = /*css*/ `
	.container {
		display: flex;
		flex-direction: row;
		list-style: none;
		padding: 0;
		margin: 0;
 
	}
	.tab {
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #162d3d;
		font-size: 14px;
		margin: 0 18px 0 0;
		transition: all 230ms ease;
		cursor: pointer;
		box-shadow: inset 0 0 0 0 blue;
	}
	.tab[active=true] {
		box-shadow: inset 0 -2px 0 0 #3899EC;
		color: #3899ec;
	}
	.tab:hover {
		color: #3899ec;
	}
`;
template.innerHTML = /*html*/ `
<style>
${css}
  </style>
  <ul class="container">
    <li active='true' class="tab">all</li>
    <li class="tab">Active</li>  
    <li class="tab">inactive</li> 
    <li class="tab">future</li>  
  </ul> 
`; 

const Tabs = class extends HTMLElement {
	constructor() {
		super();
		this._shadow = this.attachShadow({ mode: "open" });
		this._shadow.appendChild(template.content.cloneNode(true));
		this.state = {
			activeTab: null
		};
		this.tabs = this._shadow.querySelectorAll(".tab");
	}

	connectedCallback() {
		console.log("yay");
		this.tabs.forEach(tab => {
			tab.onclick = () => {
				this.tabs.forEach(x => x.removeAttribute("active"));
				tab.setAttribute("active", true);
				this.state.activeTab = tab.innerHTML;
			};
		});
	}
};
customElements.define("app-widget", Tabs);
