import { useState, useEffect } from "react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const useFirebaseUpload = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);

    useEffect(() => {
        if (!file) return;

        const storage = getStorage(app);
        const fileName = `${new Date().getTime()}-${file.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => setError(error),
            async () => {
                const downloadUrl = await getDownloadURL(
                    uploadTask.snapshot.ref,
                );

                setDownloadURL(downloadUrl);
            },
        );

        return () => {
            uploadTask.cancel();
        };
    }, [file]);

    return { progress, error, downloadURL };
};

export default useFirebaseUpload;
