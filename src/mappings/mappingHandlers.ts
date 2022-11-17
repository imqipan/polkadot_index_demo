import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const [fromAccount, toAccount, balanceChange] = event.event.data;

  // initiated a new record by its ID
  const record = new Transfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
    // event.block.block.header.hash.toString()
  );
  record.blockNumber = event.block.block.header.number.toBigInt();
  record.fromAccount = fromAccount.toString();
  record.toAccount = toAccount.toString();
  record.timestamp = event.block.timestamp;
  record.balanceChange = (balanceChange as Balance).toBigInt();
  await record.save();
}
