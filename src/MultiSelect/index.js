import register from "preact-custom-element";
import {useState, useEffect} from "preact/hooks"
import {h} from "preact"


const Dropdown = ({items, clickHandler}) => {
   return (
			<ul class="dropwdown">
				{items.map(x => (
					<li key={x.id}>
						<label>
							<input checked={x.checked} id={x.id} onChange={clickHandler} type="checkbox" />
							{x.name}
						</label>
					</li>
				))}
			</ul>
		);
};

const Multiselect = (props) => {
    const [data, setData] = useState(null);
    const [checked, setChecked] = useState([]);

	useEffect(() => {
		props.data && setData(JSON.parse(props.data));
    }, [props]);

	useEffect(() => {
        console.log(checked);
    }, [checked]);


	useEffect(() => { 
        data && setChecked(data.filter(item => item.checked))
    }, [data]);
    
    const clickHandler = (e) => {
        data.filter(item => item.id === e.target.id).map(x => x.checked = !x.checked)
        setData([...data])
    }
		if (!data) return null
		return (
			<div>
				<input type="text" />
				<Dropdown clickHandler={clickHandler} items={data} />
			</div>
		);
}
register(Multiselect, "x-multiselect", ['data']);