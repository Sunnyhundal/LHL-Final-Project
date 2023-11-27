import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useParams } from "react-router-dom";
import likeDislike from "/src/client/hooks/LikeDislike.jsx";

const ItemList = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userInfo, setuserInfo] = useState([]);
  const { isLoggedIn, user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  function findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return i;
      }
    }
    return -1;
  }

<<<<<<< Updated upstream
  useEffect(
    () => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const projectsResponse = await fetch(`/api/projects`);
          const projectsData = await projectsResponse.json();
          setProjects(projectsData);
          console.log(projectsData);

          const userInfoResponse = await fetch(`/user`);
          const userInfoData = await userInfoResponse.json();
          setuserInfo(userInfoData);
          const transformedData = Object.keys(userInfoData).map(
            (key) => userInfoData[key]);
          setuserInfo(transformedData);
          console.log(userInfoData);
          const likesResponse = await fetch(`/api/likes/${user.id}`);
          const likesData = await likesResponse.json();
          if (Array.isArray(likesData)) {
            setItems(likesData);
            console.log(likesData);
          } else {
            const transformedData = Object.keys(likesData).map(
              (key) => likesData[key]
            );
            setItems(transformedData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
=======
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const projectsResponse = await fetch(
          `/api/projects?offset=0&limit=100000`
        );
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
        // console.log(projectsData);

        const userInfoResponse = await fetch(`/user`);
        const userInfoData = await userInfoResponse.json();
        setuserInfo(userInfoData);
        const transformedData = Object.keys(userInfoData).map(
          (key) => userInfoData[key]
        );
        setuserInfo(transformedData);
        // console.log(userInfoData);
        const likesResponse = await fetch(`/api/likes/${user.id}`);
        const likesData = await likesResponse.json();
        if (Array.isArray(likesData)) {
          setItems(likesData);
          // console.log(likesData);
        } else {
          const transformedData = Object.keys(likesData).map(
            (key) => likesData[key]
          );
          setItems(transformedData);
>>>>>>> Stashed changes
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, refreshFlag]);

  const handleLikeDislike = async (projectID, action) => {
    setIsLoading(true);
    const userID = user.id; // Assuming user.id is the user's ID

    try {
      await likeDislike(userID, projectID, action);
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 m-10">
        {items.map((item) => {
          const pID = item.project_id;
          const lID = parseInt(pID);
          let projectIndex = findIndexById(projects.entities, lID);
          var projectImage = projects.entities[projectIndex];

          // console.log(projectIndex);
          // console.log(projectImage);
          // console.log(projects);
          // console.log(item);
          // console.log(
          //   projects.entities[projectIndex].images[0]);


            //   `${JSON.stringify(
            //   projects.entities[projectIndex].images[0]
            // ).replace(/\"/g, "")}`

            console.log(projects.entities[findIndexById(projects.entities, lID)].images[0]);





          return (
            <div
              key={item.id}
              className="w-120 w-20 bg-white rounded-lg shadow-md pb-"
            >
              <div className="">
                <button
                  onClick={() => {
                    handleLikeDislike(item.project_id, "dislike");
                    setRefreshFlag((prevFlag) => !prevFlag); 
                  }}
                >
                  Unlike
                </button>
              </div>

              <a href={`/projects/${item.project_id}`}>
                <img src={`${
                     projects.entities[findIndexById(projects.entities, lID)].images[0]
                   }`}

                  alt={
                    projects.entities[findIndexById(projects.entities, lID)]
                      .title
                  }
                  className="w-full h-40 object-cover object-center rounded-t-lg"
                />
              </a>

              <div className="p-4 flex flex-col items-start">
                <a
                  href={`/projects/${item.project_id}`}
                  className="flex items-center"
                >
                  <img
                    src={`/public${userInfo[findIndexById(userInfo, user.id)].profile_picture}`} // Use 'project.profile_picture'
                    alt={projects[findIndexById(projects, lID)].username} // Use 'projects[findIndexById].username' for alt text
                    className="w-10 h-10 rounded-full object-cover object-center border-2 border-gray-500"
                  ></img>
                  <span className="text-lg font-semibold pl-10 text-black ">
                    <p>
                      {
                        projects.entities[findIndexById(projects.entities, lID)].title
                      }
                    </p>
                  </span>
                </a>
                <div>
                  <p className="text-sm text-gray-600">
                  </p>
                  <p>{userInfo[findIndexById(userInfo, user.id)].username}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
