import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useMaze(size: number) {
    const center = Math.floor(size / 2);
    const grid = ref<boolean[][]>(Array.from({ length: size }, (_, r) =>
        Array.from({ length: size }, (_, c) => r === center && c === center)
    ));
    const hConnections = ref<boolean[][]>(Array.from({ length: size }, () => Array(size - 1).fill(false)));
    const vConnections = ref<boolean[][]>(Array.from({ length: size - 1 }, () => Array(size).fill(false)));
    const roomValues = ref<(string | null)[][]>(Array.from({ length: size }, () => Array(size).fill(null)));

    function isCenter(row: number, col: number): boolean {
        return row === center && col === center;
    }

    function isEnabled(row: number, col: number): boolean {
        if (isCenter(row, col) || (grid.value[row] && grid.value[row][col])) return false;
        const directions: [number, number, 'h' | 'v'][] = [
            [0, 1, 'h'], [1, 0, 'v'], [0, -1, 'h'], [-1, 0, 'v']
        ];
        return directions.some(([dr, dc, type]) => {
            const nr = row + dr, nc = col + dc;
            if (nr < 0 || nr >= size || nc < 0 || nc >= size) return false;
            if (!(grid.value[nr] && grid.value[nr][nc])) return false;
            if (type === 'h') {
                if (
                    dc === 1 &&
                    hConnections.value[row] &&
                    typeof hConnections.value[row][col] !== 'undefined' &&
                    hConnections.value[row][col]
                )
                    return true;
                if (
                    dc === -1 &&
                    hConnections.value[row] &&
                    typeof hConnections.value[row][col - 1] !== 'undefined' &&
                    hConnections.value[row][col - 1]
                )
                    return true;
            } else {
                if (
                    dr === 1 &&
                    vConnections.value[row] &&
                    typeof vConnections.value[row][col] !== 'undefined' &&
                    vConnections.value[row][col]
                )
                    return true;
                if (
                    dr === -1 &&
                    row - 1 >= 0 &&
                    vConnections.value[row - 1] !== undefined &&
                    typeof vConnections.value[row - 1][col] !== 'undefined' &&
                    vConnections.value[row - 1][col]
                )
                    return true;
            }
            return false;
        });
    }

    async function toggle(row: number, col: number): Promise<any | null> {
        if (!isEnabled(row, col)) return null;
        if (grid.value[row]) {
            grid.value[row][col] = true;
            if (roomValues.value[row]?.[col] === 'enemy') {
                try {
                    const response = await axios.get('http://localhost:5195/MazeInteractable/GetEnemy');
                    return response.data;
                } catch (error) {
                    console.error('Failed to fetch enemy:', error);
                    return null;
                }
            }
        }
        return null;
    }

    async function fetchMaze() {
        try {
            const response = await axios.get(`http://localhost:5195/Maze/GetMaze`);
            const maze = response.data;
            hConnections.value = maze.hConnections;
            vConnections.value = maze.vConnections;
            roomValues.value = maze.roomValues;
            grid.value = Array.from({ length: size }, (_, r) =>
                Array.from({ length: size }, (_, c) => r === center && c === center)
            );
        } catch (error) {
            console.error("Failed to fetch maze:", error);
        }
    }

    onMounted(() => {
        fetchMaze();
    });

    return {
        grid,
        hConnections,
        vConnections,
        roomValues,
        isCenter,
        isEnabled,
        toggle,
        size
    };
}
