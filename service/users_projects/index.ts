import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import db from "@/Services/firebaseConfig";

export const getUserByEmail = async (email: string) => {
  //const collectionRef = getCollection(db, "projetos_usuarios");

  const collectionRef = query(
    collection(db, "users_projects"),
    where("email_user", "==", email)
  );

  const snapshots = await getDocs(collectionRef);

  const docs = snapshots.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;

    return data;
  });

  return docs[0];
};

export const getUserProjectByUserId = (
  setData: (value: any[]) => void,
  usuarioLogado: string | undefined
) => {
  const collectionRef = query(
    collection(db, "users_projects"),
    where("email_user", "==", usuarioLogado?.split(":")[0])
  );

  onSnapshot(collectionRef, (snapshot) => {
    setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

  return;
};

export const getLoggedUser = (
  setData: any,
  usuarioLogado: string | undefined,
  idProjeto: string | undefined
) => {
  let collectionRef;

  if (usuarioLogado?.includes("token-login")) {
    collectionRef = query(
      collection(db, "users_projects"),
      where("email_user", "==", usuarioLogado.split(":")[0])
    );
  } else {
    if (idProjeto === "") {
      collectionRef = query(
        collection(db, "users_projects"),
        where("user_id", "==", usuarioLogado)
      );
    } else {
      collectionRef = query(
        collection(db, "users_projects"),
        where("user_id", "==", usuarioLogado),
        where("project_id", "==", idProjeto)
      );
    }
  }

  onSnapshot(collectionRef, (snapshot) => {
    setData?.(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

  return;
};
