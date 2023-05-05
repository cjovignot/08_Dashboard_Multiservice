import React, { useState, useEffect } from "react";
import axios from "axios";

const PostIt = () => {

  const [data, setData] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3010");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

// CREATE POSTIT

  // useEffect(() => {
  //   createPostIt();
  // }, []);

    const createPostIt = async (e) => {
        e.preventDefault();

        console.log(newTitle);
        console.log(newContent);
        
        try {
            const response = await axios.post(`http://localhost:3010/new`, {
                title: newTitle,
                content: newContent,
            });
            console.log(response);

            setData((prevData) => [...prevData, response.data]);
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


  const handleDelete = async (postiIt_id, setData) => {
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
                <div className="flex justify-end">
                    <img className="w-80 -m-2" src=""/>
                </div>
                <form onSubmit={createPostIt}>
                    <input
                        type="text"
                        placeholder="Title"
                        className="input glass w-full text-black mb-2"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                        type="text"
                        placeholder="Content"
                        className="input glass w-full text-black p-3"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                    ></textarea>
                    <div className="flex justify-center">
                        <button type="submit" className="btn btn-success w-20 text-center mt-4">Create</button>
                    </div>
                </form>



                {/* MAPPING ALL POSTS */}
                <div className="flex justify-center">
                    <h1 className="card-title text-3xl font-bold mt-5">My PostIts</h1>
                </div>
            
                {data && data.map((item, i) => (
                    <div key={i} className="card-body bg-base-100 rounded-lg m-5">
                        <input
                            type="text"
                            className="input glass w-full text-black mb-2 card-title"
                            // placeholder={item.title}
                            // onChange={(e) => setTitleContent(e.target.value)}
                            value={item.title}
                            />
                        <textarea
                            type="text"
                            className="input glass w-full text-black p-3 h-auto"
                            // placeholder={item.content}
                            // onChange={(e) => setContentPostIt(e.target.value)}
                            value={item.content}
                            ></textarea>
                        <div className="flex justify-between">
                            <button
                              // onClick={() => handleEdit(item._id)}
                              className="btn btn-info w-20"
                              value={item._id}>Edit</button>
                            <button onClick={() => handleDelete(item._id, setData)} className="btn btn-error w-20">Delete</button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default PostIt;