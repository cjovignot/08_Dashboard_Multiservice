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
        <div className="card w-auto bg-base-100 shadow-xl image-full  ml-10 mr-10 mb-10"
        style={{
            backgroundImage: "url('https://i0.wp.com/www.collectedmiscellany.com/wp-content/uploads/2021/07/background-brown-cork-board-texture-close-up_77190-2560.jpeg?ssl=1')",
            backgroundPosition: "center",
            backgroundSize: "cover",
        }}>
          <div id="postitcard" className="flex card-body max-h-44 overflow-scroll">
            {/* {userCookie && */}
            <div className="flex">
                <form onSubmit={createPostIt} className="flex-col">
                  <div className="flex">
                    <div>
                      <input type="text" placeholder="Title" className="input glass w-full text-black mb-5 placeholder-black" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                      <textarea type="text" placeholder="Content" className="input glass w-full text-black p-3 placeholder-black" value={newContent} onChange={(e) => setNewContent(e.target.value)}></textarea>
                    </div>
                    <div className="flex-col items-center">
                      <a href="#myList" className="btn w-20 text-center ml-4 mb-5">MyPostIt</a>
                      <button type="submit" className="btn btn-success w-20 text-center ml-4">Create</button>
                    </div>
                  </div>
                </form>
            </div>
            {/* } */}

              {/* MAPPING ALL POSTS */}
              {/* {userCookie && */}
                <div className="flex justify-center">
                    <h1 id="myList" className="card-title text-3xl font-bold mt-5">My PostIts</h1>
                </div>
              {/* } */}

              {/* {!userCookie &&
                <div className="flex justify-center">
                  <h1 className="card-title text-xl font-bold">Please Login to use PostIt</h1>
                </div>
              } */}
              {data && userCookie && data.map((item, i) => (
                <div>
                  <div key={i} className="card-body rounded-lg m-5 p-0"
                    style={{
                      backgroundImage:
                        "url('http://clipart-library.com/images/kcKoj8p5i.png')",
                        backgroundSize: '100%',
                        backgroundHeight: 'auto',
                        backgroundRepeat: 'none',
                      }}
                  >
                    {/* <div className="flex justify-end"> */}
                    <label onClick={() => handleDelete(item._id, setData)} className="btn btn-sm btn-circle absolute bg-red-700 border-none text-center absolute ml-72 mt-4">✕</label>
                    {/* <button onClick={() => handleDelete(item._id, setData)} className="btn btn-error w-18 rounded-full absolute text-center absolute ml-72">x</button> */}
                    {/* </div> */}
                    <h1 className="card-title text-xl text-black font-bold mb-5 z-10 ml-10 mt-10">{item.title}</h1>
                    <p className="z-10 text-black ml-10 pb-5 w-60">{item.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
    );
}

export default PostIt;