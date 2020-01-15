import register from "preact-custom-element";
import { useState, useEffect, useRef } from "preact/hooks";
import { h } from "preact";
import "./styles.scss";
import useClickOutside from "../../utils/useClickOutside";
import { ArrowDown } from "../../utils/Icons";
import classNames from "classnames";
import useKeyPress from "../../utils/useKeyPress";

const Dropdown = ({ items, addClickHandler, isOpen, maxHeight }) => {
	const classes = classNames({
		dropwdown: true,
		open: isOpen,
		maxHeight: maxHeight ? maxHeight : false 
	});

	const checkboxRef = useRef([]);

	if (!items.length)
		return (
			<ul className={classes}>
				<li>
					<label className="noItems">No items found...</label>
				</li>
			</ul>
		);
	return (
		<ul className={classes}>
			{items.map((x, i) => (
				<li
					tabIndex={0}
					key={x.id}
					id={x.id}
					checked={x.checked}
					onKeyPress={e => {
						if (e.key === "Enter") {
							checkboxRef.current[i].checked = true;
							addClickHandler(e);
						}
					}}
				>
					<label>
						<input
							ref={el => (checkboxRef.current[i] = el)}
							key={x.checked}
							id={x.id}
							checked={x.checked}
							onChange={addClickHandler}
							type="checkbox"
						/>
						{x.name}
					</label>
				</li>
			))}
		</ul>
	);
};

const Tags = ({ items, removeClickHandler }) => {
	return (
		<div className="tags">
			{items.map(item => (
				<span>
					{item.name}{" "}
					<i id={item.id} onClick={removeClickHandler}>
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

	const backSpaceDelete = useKeyPress("backspace");
	console.log(backSpaceDelete);

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

	const event = new CustomEvent("stateUpdated", {
		detail: checked,
		bubbles: true
	});

	useEffect(() => {
		if (realInputRef.current) realInputRef.current.dispatchEvent(event);
	}, [checked]);

	const addClickHandler = e => {
		const ctx = unChecked.filter(item => item.id === e.target.id);
		const ctx2 = unChecked.filter(item => item.id !== e.target.id);
		setChecked([...checked, ...ctx]);
		setUnChecked([...ctx2]);
		realInputRef.current.focus();
	};

	const removeClickHandler = e => {
		const ctx = checked.filter(item => item.id !== e.target.id);
		const ctx2 = checked.filter(item => item.id === e.target.id);
		setChecked([...ctx]);
		setUnChecked([...ctx2, ...unChecked]);
		realInputRef.current.focus();
	};

	useEffect(() => {
		if (backSpaceDelete && !searchTerm.length) {
			const e = { target: checked[checked.length - 1] };
			removeClickHandler(e);
			return () => backSpaceDelete;
		}
	}, [backSpaceDelete]);

	useEffect(() => {
		if (searchTerm.length) {
			let filter = unChecked.filter(
				item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
			);
			setFilteredData(filter);
		} else {
			setFilteredData(unChecked);
		}
		return () => searchTerm;
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

	const realInputRef = useRef();

	useEffect(() => {
		isOpen && realInputRef.current.focus();
	}, [isOpen]);

	const classes = classNames({
		fakeInput: true,
		focused: isOpen ? true : false
	});

	const placeholder = props.placeholder ? props.placeholder : "Select Value";

	if (!data) return null;
	return (
		<div ref={wrappRef}>
			<div className={classes}>
				<div onClick={() => setOpen(true)} className="content">
					<Tags removeClickHandler={removeClickHandler} items={checked} />
					<input
						placeholder={placeholder}
						onInput={termSearchHandler}
						type="text"
						ref={realInputRef}
					/>
				</div>
				<ArrowDown onClick={() => setOpen(!isOpen)} className="arrow" />
			</div>
			<Dropdown
				maxHeight={props.maxHeight}
				isOpen={isOpen}
				addClickHandler={addClickHandler}
				items={filteredData}
			/>
		</div>
	);
};

register(Multiselect, "x-multiselect", ["data"]);
