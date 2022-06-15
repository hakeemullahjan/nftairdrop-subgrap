import { Transfer } from "../generated/RankRewardsNFT/RankRewardsNFT";
import { NFTAvatar, User } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  let entity = new NFTAvatar(event.params.tokenId.toString());

  const owner = event.params.to;

  let user = User.load(owner.toHexString());

  if (!user) {
    user = new User(owner.toHexString());
    user.count = 0;
  }

  user.count = user.count + 1;

  entity.owner = user.id;

  entity.transaction = event.transaction.hash;

  user.save();
  entity.save();
}
