export const download = async (url: string, filename: string) => {
  return new Promise<void>((res) => {
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', filename);
    a.click();
    res();
  });
};
