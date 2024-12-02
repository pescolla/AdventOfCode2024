const fs = require('fs');

function calculateDistance(leftList, rightList) {
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);
    
    let totalDistance = 0;
    
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }
    
    return totalDistance;
}

fs.readFile('stringheday1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Errore nella lettura del file:', err);
        return;
    }
    
    const lines = data.trim().split('\n');
    const leftList = [];
    const rightList = [];

    lines.forEach(line => {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    });

    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    console.log("Lista 1 (Left List) ordinata:", leftList);
    console.log("Lista 2 (Right List) ordinata:", rightList);

    const totalDistance = calculateDistance(leftList, rightList);
    console.log('Distanza totale:', totalDistance);

    const rightCount = {};
    for (const val of rightList) {
        rightCount[val] = (rightCount[val] || 0) + 1;
    }

    let similarityScore = 0;

    for (const val of leftList) {
        if (rightCount[val]) {
            const contribution = val * rightCount[val];
            console.log(`Il valore ${val} si presenta con ${rightCount[val]}, quindi il Similarity score è ${contribution}`);
            similarityScore += contribution;
        }
    }

    console.log('Similarity Score totale:', similarityScore);
});
