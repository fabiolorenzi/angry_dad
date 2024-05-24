function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let partInSeconds = seconds % 60;
    partInSeconds = partInSeconds.toString().padStart(2, "0");
    return `${minutes}:${partInSeconds}`;
}

export { formatTime };