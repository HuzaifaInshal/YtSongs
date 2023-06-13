
// use original filename coming from server


// export const downloadFile = (videoId) => {
//     fetch(`http://localhost:3000/download/${videoId}`)
//       .then(response => {
//         if (response.ok) {
//           // Extract the filename from the response headers
//           const filename = response.headers
//             .get('Content-Disposition')
//             .split('filename=')[1];

//           // Create a Blob from the response
//           return response.blob().then(blob => ({ blob, filename }));
//         } else {
//           // Handle the error, e.g., show an error message
//           throw new Error('Error downloading the file');
//         }
//       })
//       .then(({ blob, filename }) => {
//         // Create a temporary URL for the blob
//         const url = URL.createObjectURL(blob);

//         // Create a link element
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = filename; // Use the original filename
//         link.click();

//         // Clean up the temporary URL
//         URL.revokeObjectURL(url);
//       })
//       .catch(error => {
//         console.error(error);
//         // Handle the error, e.g., show an error message
//       });




// custom filename

export function downloadFile(videoId,title){
  fetch(`http://localhost:4000/download/${videoId}`)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = title; // Replace with the desired file name
      link.click();
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
};


