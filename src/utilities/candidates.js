const handleSubmit = async (e, data) => {
  e.preventDefault();
  setLoading(true);
  console.log("first");

  try {
    console.log("first in try");
    const imagePath = await uploadImage(image, "images/candidates");
    console.log("Image Path", imagePath);
    if (!imagePath) {
      setErrMessage("Error Uploading Image");
      setLoading(false);
      return;
    }
    data.imageURL = imagePath;

    const candidate = await createCandidate(data);
    console.log("Candidate created with ID:", candidate);
    if (candidate) {
      console.log("first in try success");
      toast.success("Candidate Created Successfully");
      // setMessage("Candidate Created Successfully");
    } else {
      setErrMessage("Error Creating Candidate");
      toast.error("Error Creating Candidate");
    }
  } catch (error) {
    console.log("Error creating candidate", error);
    // setErrMessage("Error Creating Candidate");
    console.log("first in try catch");
    toast.error("Error Creating Candidate");
  } finally {
    console.log("first in try finally");
    setLoading(false);
  }
};
