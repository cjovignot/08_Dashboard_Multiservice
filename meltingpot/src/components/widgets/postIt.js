import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const PostIt = () => {

  const [data, setData] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const userCookie = Cookies.get("userId");
  
  useEffect(() => {
    if (userCookie) {
      fetchData();
    }
  }, [userCookie]);

  
  const fetchData = async () => {
    try {
      console.log(userCookie);
      const response = await axios.get(`http://localhost:3010/user/${userCookie}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

// CREATE POSTIT

    const createPostIt = async (e) => {
        e.preventDefault();

        console.log(newTitle);
        console.log(newContent);
        
        try {
            const response = await axios.post(`http://localhost:3010/new`, {
                title: newTitle,
                content: newContent,
                user_id: userCookie,
            });
            console.log(response);

            fetchData();
            setNewTitle('');
            setNewContent('');
          } catch (error) {
              console.error(error);
          }
    };

// EDIT POSTIT
  // const [editItems, setEditItems] = useState([]);

  // const handleEdit = (postId) => {
  //   setEditItems((prevEditItems) => [...prevEditItems, postId]);
  // };

  // const handleSave = async (postId) => {
  //   const editedItem = data.find((item) => item._id === postId);

  //   try {
  //     const response = await axios.put(`http://localhost:3010/edit/` + postId, {
  //         title: editedItem.title,
  //         content: editedItem.content,
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setEditItems((prevEditItems) =>
  //     prevEditItems.filter((item) => item !== postId)
  //   );
  // };


  const handleDelete = async (postiIt_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3010/delete/${postiIt_id}`
      );
      setData((prevPostIt) =>
        prevPostIt.filter((item) => item._id !== postiIt_id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  


    return (
        <div className="flex card shadow-xl m-auto m-10 glass mt-4 mb-4">
          <div className="flex card-body">
            {userCookie &&
              <form onSubmit={createPostIt}>
                <input type="text" placeholder="Title" className="input glass w-full text-black mb-2" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                  <textarea type="text" placeholder="Content" className="input glass w-full text-black p-3" value={newContent} onChange={(e) => setNewContent(e.target.value)}></textarea>
                  <div className="flex justify-center">
                      <button type="submit" className="btn btn-success w-20 text-center mt-4">Create</button>
                  </div>
              </form>
            }

              {/* MAPPING ALL POSTS */}
              {userCookie &&
                <div className="flex justify-center">
                    <h1 className="card-title text-3xl font-bold mt-5">My PostIts</h1>
                </div>
              }

              {!userCookie &&
                <div className="flex justify-center">
                  <h1 className="card-title text-xl font-bold">Please Login to use PostIt</h1>
                </div>
              }
              {data && userCookie && data.map((item, i) => (
                <div key={i} className="card-body bg-base-100 rounded-lg m-5">
                  <h1 className="card-title text-xl font-bold mb-5">{item.title}</h1>
                  <p>{item.content}</p>
                  <div className="flex justify-end">
                      <button onClick={() => handleDelete(item._id, setData)} className="btn btn-error w-20">Delete</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
    );
}

export default PostIt;