import React, { useEffect, useState } from "react";
import JsonData from "./MockData.json";
import ReactPaginate from "react-paginate";
import {useNavigate} from 'react-router-dom';
import axios from "./api/axios";
import CountdownTimer from "./Countdown";

function UserList() {
    const [users, setUsers] = useState(JsonData.slice(0, 50));
    const [pageNumber, setPageNumber] = useState(0);
    const [loginStatus, setStatus] = useState('');
    const navigate = useNavigate();
  
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
  
    const displayUsers = users
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((user) => {
        return (<tbody key={user.id + 130}>
                <tr key={user.id}>
                    <td key={user.firstName}>{user.firstName}</td>
                    <td key={user.lastName}>{user.lastName}</td>
                    <td key={user.email}>{user.email}</td>
                </tr>
                </tbody>
        );
      });
    
    const pageCount = Math.ceil(users.length / usersPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
      // selected.preventDefault();
    };
    const Logout = () => {
      navigate('/', {replace: true});
    }

    useEffect(() => {
        axios.get("/",  {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
    }).then((response) => {
        if(response.data.loggedIn === true){
          setStatus(response.data.user[0].firstname);
          setTimeout(() => {
            window.location.reload(false);
          }, 61000);
        }
        else if (response.data.loggedIn === false){
          navigate('/', {replace: true});
        }
      });
    }, [])

    // useEffect(() => {
    //   setTimeout(() => {
    //     window.location.reload(false);
    //   }, 61000)
    // }, [])
    
      return (
        <>
        <header>
          <h1>Hello {loginStatus}</h1>
        </header>
        <div className="sidenav">
          <p>List of Users</p>
          <CountdownTimer countdownTimestampMs={Date.now()+60000} />  

          <button className="out" onClick={Logout}>
              Logout
          </button>
        </div>
        <div className="Fond">
          <table>
            <thead>
              <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
              </tr>
              </thead>
          {displayUsers}
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
        </>
      );
}
  
export default UserList;