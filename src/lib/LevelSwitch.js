import Immutable from 'immutable';


export function switchLevels(level='BEGINNER'){
	switch(level){
			case 'BEGINNER':
				const board = Immutable.fromJS({
					difficulty: 'BEGINNER',
					columns: 9,
					mines: 9,
					rows: 9
				});
				return board;
			case 'INTERMEDIATE':
				const board = Immutable.fromJS({
					difficulty: 'INTERMEDIATE'
					columns: 18,
					mines: 18,
					rows: 40 
				});
				return board;
			case 'EXPERT':
				const board = Immutable.fromJS({
					difficulty: 'EXPERT',
					columns: 99,
					mines: 26,
					rows: 26
				});
				return board;
			default:
				const board = {
					difficulty: 'BEGINNER',
					columns: 10,
					mines: 9,
					rows: 9
				};
				return board;
		};
}
