const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe("Block", () => {
  const timestamp = "a-date";
  const lastHash = "foo-hash";
  const hash = "bar-hash";
  const data = ["blockchain", "data"];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
  });

  it("has a timestamp, lastHash, hash, data property", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  //genesis
  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  //mining
  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.minedBlock({ lastBlock, data });

    it("returns a Block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    //minedBlocks lastHash should be equal to last blocks hash
    it("sets the `lastHash` to be the `hash` of the lastBlock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data`", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("sets a timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
  });
});
