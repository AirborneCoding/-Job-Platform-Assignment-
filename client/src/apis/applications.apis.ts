import axios from "axios";

export async function fetchAllApplications() {
  try {
    const res = await axios.get("/api/v1/applications");
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createApplication(formData: FormData) {
  try {
    const res = await axios.post("/api/v1/applications/apply", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
