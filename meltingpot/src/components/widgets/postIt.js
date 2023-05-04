const PostIt = () => {

    const handleChange = async (e) => {
        e.preventDefault();
        console.log(pkmnName);
        
        try {
            const response = await axios.get(`http://localhost:3002/${pkmnName}`);
            console.log(response.data);
            console.log(response.data.stats)
            setData(response.data);
          } catch (error) {
              console.error(error);
          }
      };

    return (
        <div className="card w-128 bg-base-100 shadow-xl image-full m-auto m-10">
            <div className="card-body">
                <h2 className="card-title">Post It</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    );
}

export default PostIt;