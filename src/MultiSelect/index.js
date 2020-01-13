import register from "preact-custom-element";
import { useState, useEffect, useRef } from "preact/hooks";
import { h } from "preact";
import "./styles.scss";
import useClickOutside from "../../utils/useClickOutside";
import { ArrowDown } from "../../utils/Icons";
import classNames from "classnames";

const Dropdown = ({ items, clickHandler, isOpen, maxHeight }) => {

	console.log(maxHeight);
	const classes = classNames({
		dropwdown: true,
		open: isOpen,
		maxHeight: maxHeight ? maxHeight : false
	});

	if (!items.length)
		return (
			<ul className={classes}>
				<li>
					<label>
						<pre>No items found...</pre>
					</label>
				</li>
			</ul>
		);
	return (
		<ul className={classes}>
			{items.map((x, i) => (
				<li className={x.checked ? "checked" : undefined} key={x.id}>
					<label>
						<input
							tabIndex={i}
							aria-checked={x.checked}
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
	const [isOpen, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const [inputState, setInputState] = useState({ focused: false });
	const { focused } = inputState;

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
		} else {
			setFilteredData(unChecked);
		}
	}, [searchTerm]);

	let timeout;
	const termSearchHandler = e => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			setSearchTerm(e.target.value);
		}, 25);
	};

	const [wrappRef, isClickOutside] = useClickOutside();

	isClickOutside && setOpen(false);

	const classes = classNames({
		fakeInput: true,
		focused: focused,
	});

	if (!data) return null;
	return ( 
		<div onClick={() => setOpen(true)} ref={wrappRef}>
			<div className={classes}>
				<Tags clickHandler={clickHandler} items={checked} />
				<ArrowDown className="arrow" />
				<input
					onInput={termSearchHandler}
					type="text"
					autoFocus={isOpen}
					onFocus={e => setInputState({ focused: true })}
					onBlur={e => setInputState({ focused: false })}
				/>
			</div>
			<Dropdown
				maxHeight={props.maxHeight}
				isOpen={isOpen}
				clickHandler={clickHandler}
				items={filteredData}
			/>
		</div>
	);
};
register(Multiselect, "x-multiselect", ["data"]);
