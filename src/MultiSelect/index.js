import register from "preact-custom-element";
import { useState, useEffect, useRef } from "preact/hooks";
import { h } from "preact";
import "./styles.scss";

const Dropdown = ({ items, clickHandler }) => {
	useEffect(() => {}, [items]);

	return (
		<ul class="dropwdown">
			{items.map(x => (
				<li className={x.checked ? "checked" : undefined} key={x.id}>
					<label>
						<input
							checked={x.checked}
							id={x.id}
							onChange={clickHandler}
							type="checkbox"
						/>
						{x.name}
					</label>
				</li>
			))}
		</ul>
	);
};

const Tags = ({ items, clickHandler }) => {
	return (
		<div className="tags">
			{items.map(item => (
				<span>
					{item.name}{" "}
					<i id={item.id} onClick={clickHandler}>
						⨯
					</i>
				</span>
			))}
		</div>
	);
};

const Multiselect = props => {
	const [data, setData] = useState(null);
	const [checked, setChecked] = useState([]);
	const [unChecked, setUnChecked] = useState([]);
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		props && props.data && setData(JSON.parse(props.data));
	}, [props]);

	useEffect(() => {
		setFilteredData(unChecked);
	}, [unChecked]);

	useEffect(() => {
		if (data) {
			setChecked(data.filter(item => item.checked));
			setUnChecked(data.filter(item => !item.checked));
		}
	}, [data]);


	const clickHandler = e => {
		data
			.filter(item => item.id === e.target.id)
			.map(x => (x.checked = !x.checked));
		setData([...data]);
	};


	useEffect(() => {
		if (searchTerm.length) {
			let filter = unChecked.filter(
				item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
			);
			setFilteredData(filter);
		}  else {
			setFilteredData(unChecked);
		}
	}, [searchTerm]);


	let timeout;
	const termSearchHandler = (e) =>{
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			setSearchTerm(e.target.value)
		}, 300)
	}

	if (!data) return null;
	return (
		<div>
			<div className="fakeInput">
				<Tags clickHandler={clickHandler} items={checked} />
				<input
					onInput={termSearchHandler}
					onClick={() => setOpen(true)}
					type="text"
				/>
			</div>
			<Dropdown clickHandler={clickHandler} items={filteredData} />
		</div>
	);
};
register(Multiselect, "x-multiselect", ["data"]);
