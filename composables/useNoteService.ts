export const useNoteService = () => {
   const appStore = useAppStore();
   const { $trpc } = useNuxtApp();

   const refreshNote = async () => {
      const notes = await $trpc.data.note.getNotes.query({});
      appStore.note.clear();
      notes.forEach((note) => {
         appStore.note.set(note.Key, note);
      });
   };
   const getNoteRef = (key: string) => {
      return computed(() => appStore.note.get(key));
   };
   const upsertNote = async (
      key: string,
      input: {
         Title: string
         Body: string
      },
   ) => {
      await $trpc.data.note.upsertNote.mutate({
         Key: key,
         Date: new Date(),
         ...input,
      });
      await refreshNote();
   };
   const deleteNote = async (key: string) => {
      await $trpc.data.note.deleteNote.mutate({ Key: key });
      await refreshNote();
   };

   useState("iNoteIsInitialized", async () => {
      await refreshNote();
      return true;
   });

   return {
      getNoteRef,
      upsertNote,
      deleteNote,
   };
};
