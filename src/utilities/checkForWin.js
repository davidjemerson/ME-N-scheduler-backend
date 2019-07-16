const checkForWin = function (model) {
	let talley = {};
	model.datePool.forEach((date) => {
		talley[date] = 0;
	});
	model.invites.forEach((invite) => {
		invite.votes.forEach((date) => {
			talley[date] += 1;
		});
	});
	let highVote = 0;
	let winDate;
	model.datePool.forEach((date) => {
		if (talley[date] >= model.winThreshold) {
			if (talley[date] > highVote) {
				highVote = talley[date];
				winDate = date;
			} else if (talley[date] === highVote) {
				if (date < winDate) {
					winDate = date;
				}
			}
		}
	});
	if (highVote >= model.winThreshold) {
		console.log(`Threshold met. Current vote winner is ${winDate} with ${highVote} votes.`);
		return winDate;
	} else {
		console.log('Win threshold has not been met.');
		return false;
	}
};

export default checkForWin;