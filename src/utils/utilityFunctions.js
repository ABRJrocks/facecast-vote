import { getDocs } from "firebase/firestore";

export const fetchSpecificFieldsFromCollection = async (
  collectionRef,
  fields,
  filterField,
  filterValue
) => {
  try {
    const querySnapshot = await getDocs(collectionRef);

    const data = [];
    querySnapshot.forEach((doc) => {
      const docData = { id: doc.id }; // Include the document ID in the object
      if (!filterField || doc.data()[filterField] === filterValue) {
        fields.forEach((field) => {
          docData[field] = doc.data()[field];
        });
        data.push(docData);
      }
    });

    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
};

export const fetchSpecificFieldsFromCollectionWithOutFilter = async (
  collectionRef,
  fields
) => {
  try {
    const querySnapshot = await getDocs(collectionRef);

    const data = [];
    querySnapshot.forEach((doc) => {
      const docData = { id: doc.id }; // Include the document ID in the object
      fields.forEach((field) => {
        docData[field] = doc.data()[field];
      });
      data.push(docData);
    });

    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

