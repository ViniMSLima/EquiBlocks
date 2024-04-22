import { useState } from "react";
import { Centered, Icon, Links, MenuLinks, Nav, NavLink, NavMenu, Row, Span, Supergraphic, Void } from "./styles";
import styles from './supergraphic.module.css';
import Menu from './img/list-view-mobile.svg';
import Close from './img/close-small.svg';
import Right from './img/forward-right-small.svg';
import { Outlet, useNavigate } from "react-router-dom";

export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [listOpenStudent, setListOpenStudent] = useState(false);
    const [listOpenClass, setListOpenClass] = useState(false);
    const [listOpenDiscipline, setListOpenDiscipline] = useState(false);
    const [listOpenInstructor, setListOpenInstructor] = useState(false);
    const [listOpenArea, setListOpenArea] = useState(false);

    const navigate = useNavigate();

    function handleClick(){
        setIsMenuOpen(!isMenuOpen);
    }

    return(
        <>
            <Supergraphic className={styles.supergraphic}/>
            <Row>            
                <div 
                    className={styles.logo} 
                    onClick={() => navigate('/main/dashboard')}
                />
                <Void />
                <Links>
                    <Void />
                    <Void />
                    <NavLink onClick={handleClick}>
                        <img src={ isMenuOpen? Close : Menu} />
                        <Centered>
                            Menu
                        </Centered>
                    </NavLink>
                </Links>                
            </Row>
            { isMenuOpen && 
                <MenuLinks>
                    <Span>
                        <NavMenu  
                            onMouseOver={e => setListOpenStudent(true)}
                            onMouseOut={e => setListOpenStudent(false)} 
                        >
                            <Nav>Alunos</Nav> 
                            <Icon src={Right} />
                            {listOpenStudent && <Span>
                                <NavLink to={'/main/students/new'} onClick={handleClick}>Cadastrar</NavLink>
                            </Span>}
                        </NavMenu> 
                    </Span>
                    <Span>
                        <NavMenu 
                            onMouseOver={e => setListOpenClass(true)}
                            onMouseOut={e => setListOpenClass(false)} 
                        >
                            <Nav>Turmas</Nav> 
                            <Icon src={Right} />
                            {listOpenClass && <Span>
                                <NavLink to={'/main/classes/new'} onClick={handleClick}>Cadastrar</NavLink>
                                <NavLink to={'/main/dashboard/'} onClick={handleClick}>Turmas</NavLink>
                            </Span>}
                        </NavMenu>
                    </Span>
                    <Span>
                        <NavMenu 
                            onMouseOver={e => setListOpenDiscipline(true)}
                            onMouseOut={e => setListOpenDiscipline(false)} 
                        >
                            <Nav>Disciplinas</Nav> 
                            <Icon src={Right} />
                            {listOpenDiscipline && <Span>
                                <NavLink to={'/main/discipline/new'} onClick={handleClick}>Cadastrar</NavLink>
                                <NavLink to={'/main/discipline/'} onClick={handleClick}>Buscar Disciplina</NavLink>
                            </Span>}
                        </NavMenu>
                    </Span>
                    <Span>
                        <NavMenu 
                            onMouseOver={e => setListOpenInstructor(true)}
                            onMouseOut={e => setListOpenInstructor(false)} 
                        >
                            <Nav>Instrutor </Nav>
                            <Icon src={Right} />
                            {listOpenInstructor && <Span>
                                <NavLink to={'/main/instructor/new'} onClick={handleClick}>Cadastrar</NavLink>
                                <NavLink to={'/main/instructor/'} onClick={handleClick}>Buscar Instrutor</NavLink>
                            </Span>}
                        </NavMenu>
                    </Span>
                    <Span>
                        <NavMenu 
                            onMouseOver={e => setListOpenArea(true)}
                            onMouseOut={e => setListOpenArea(false)} 
                        >
                            <Nav>Área </Nav>
                            <Icon src={Right} />
                            {listOpenArea && <Span>
                                <NavLink to={'/main/area/new'} onClick={handleClick}>Cadastrar</NavLink>
                            </Span>}
                        </NavMenu>
                    </Span>
                </MenuLinks>
            }
            <Outlet />
        </>
    )
}