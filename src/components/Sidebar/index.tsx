/* eslint-disable no-console */
import { h, FunctionComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import register from 'preact-custom-element';
import s from './styles.scss';
import LogoIcon from './LogoIcon';


type MenuItem = {
  id?: string,
  label: string
};
type Section = {
  label?: string,
  items: MenuItem[]
};
interface Props {
  data: string
  activemenuitem: string,
}


const Logo = () => (
  <div className={s.logo}><LogoIcon /></div>
);

const Section: FunctionComponent<{ section: Section, isActive: MenuItem, clickHandler: any}> = (
  { section, isActive, clickHandler },
) => (
  <div className={s.section}>
    {section.label && <h5>{section.label}</h5>}
    <ul>
      {section.items.map((item, index) => (
        <li
          key={item.label}
        >
          <button
            tabIndex={-index}
            className={isActive && isActive.label === item.label ? s.active : undefined}
            type="button"
            onClick={() => clickHandler(item)}
            onKeyPress={() => clickHandler(item)}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar: FunctionComponent<Props> = ({ data, activemenuitem }) => {
  const [dataState, setData] = useState<Section[]>([]);
  const [active, setActive] = useState<MenuItem | null>(null);

  const componentRef = useRef<HTMLDivElement>();

  const clickEvent = new CustomEvent('menuItemClicked', {
    detail: active,
    bubbles: true,
  });

  const clickHandler = (item) => setActive(item);

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      setData(parsedData);

      if (activemenuitem) {
        parsedData.map((section) => {
          const filter = section.items.filter((item) => item.label === activemenuitem);
          if (!filter.length) return;
          // @ts-ignore
          setActive(...filter);
        });
      }
    }
  }, [data, activemenuitem]);

  useEffect(() => {
    if (componentRef.current) componentRef.current.dispatchEvent(clickEvent);
  }, [active]);


  if (!dataState) return null;
  return (
    <div ref={componentRef} className={s.sidebar}>
      <Logo />
      {dataState.map((section) => (
        <Section
          key={section.label}
          section={section}
          isActive={active}
          clickHandler={clickHandler}
        />
      ))}
    </div>
  );
};

register(Sidebar, 'x-sidebar', ['data', 'activemenuitem']);

export default Sidebar;
