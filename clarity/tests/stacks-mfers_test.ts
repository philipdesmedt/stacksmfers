import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from "https://deno.land/x/clarinet@v0.13.0/index.ts";

Clarinet.test({
  name: "stacks-mfers: mint a stacks-mfer",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!
    let wallet_1 = accounts.get("wallet_1")!

    let block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "claim", [], wallet_1.address),
      Tx.contractCall("stacks-mfers", "toggle-sale-state", [], deployer.address),
      Tx.contractCall("stacks-mfers", "claim", [], wallet_1.address),
    ]);
    block.receipts[0].result.expectErr().expectUint(102); // public sale disabled
    block.receipts[2].result.expectOk().expectUint(2); // next mint would be ID 2
  },
});

Clarinet.test({
  name: "stacks-mfers: mint five stacks-mfers",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!
    let wallet_1 = accounts.get("wallet_1")!

    let block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "toggle-sale-state", [], deployer.address),
      Tx.contractCall("stacks-mfers", "claim-five", [], wallet_1.address),
    ]);
    block.receipts[1].result.expectOk().expectUint(7); // next mint would be ID 7
  },
});

Clarinet.test({
  name: "stacks-mfers: mint ten stacks-mfers",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!
    let wallet_1 = accounts.get("wallet_1")!

    let block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "toggle-sale-state", [], deployer.address),
      Tx.contractCall("stacks-mfers", "claim-ten", [], wallet_1.address),
    ]);
    block.receipts[1].result.expectOk().expectUint(14); // next mint would be ID 14
  },
});

Clarinet.test({
  name: "stacks-mfers: mint twenty five stacks-mfers",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!
    let wallet_1 = accounts.get("wallet_1")!

    let block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "toggle-sale-state", [], deployer.address),
      Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_1.address),
    ]);
    block.receipts[1].result.expectOk().expectUint(36); // next mint would be ID 36
  },
});

Clarinet.test({
  name: "stacks-mfers: whitelist mint stacks-mfers",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!
    let wallet_1 = accounts.get("wallet_1")!

    let block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "enable-premint", [], deployer.address),
      Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_1.address),
      Tx.contractCall("stacks-mfers", "claim", [], wallet_1.address),
    ]);
    block.receipts[1].result.expectErr().expectUint(102);
    block.receipts[2].result.expectOk().expectUint(2);
  },
});

Clarinet.test({
  name: "stacks-mfers: transfer stacks-mfers",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    let wallet_3 = accounts.get("wallet_3")!;

    let block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "toggle-sale-state", [], deployer.address),
      Tx.contractCall("stacks-mfers", "claim", [], wallet_1.address),
      Tx.contractCall("stacks-mfers", "claim", [], wallet_2.address),
    ]);
    block.receipts[0].result.expectOk();
    block.receipts[1].result.expectOk();
    block.receipts[2].result.expectOk();

    let call = chain.callReadOnlyFn(
      "stacks-mfers",
      "get-balance",
      [types.principal(wallet_1.address)],
      wallet_1.address
    );
    call.result.expectUint(1);

    block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "transfer", [
        types.uint(1),
        types.principal(wallet_1.address),
        types.principal(wallet_3.address)
      ], wallet_1.address)
    ]);
    block.receipts[0].result.expectOk();

    call = chain.callReadOnlyFn(
      "stacks-mfers",
      "get-balance",
      [types.principal(wallet_1.address)],
      wallet_1.address
    );
    call.result.expectUint(0);
    call = chain.callReadOnlyFn(
      "stacks-mfers",
      "get-balance",
      [types.principal(wallet_3.address)],
      wallet_1.address
    );
    call.result.expectUint(1);

    call = chain.callReadOnlyFn(
      "stacks-mfers",
      "get-owner",
      [types.uint(1)],
      wallet_1.address
    );
    call.result.expectOk().expectSome().expectPrincipal(wallet_3.address);

    block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "transfer", [
        types.uint(55),
        types.principal(wallet_2.address),
        types.principal(wallet_3.address)
      ], wallet_2.address)
    ]);
    block.receipts[0].result.expectErr().expectUint(3);
  }
});

Clarinet.test({
  name: "stacks-mfers: list/unlist/buy NFT on market",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    let block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "toggle-sale-state", [], deployer.address),
      Tx.contractCall("stacks-mfers", "claim", [], wallet_1.address),
    ]);
    block.receipts[0].result.expectOk();
    block.receipts[1].result.expectOk();

    block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "list-in-ustx", [
        types.uint(1),
        types.uint(100000000),
        types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacks-mfers-stxnft-commission')
      ], wallet_1.address)
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "unlist-in-ustx", [
        types.uint(1)
      ], deployer.address)
    ]);
    block.receipts[0].result.expectErr().expectUint(104);

    block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "unlist-in-ustx", [
        types.uint(1)
      ], wallet_1.address)
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "list-in-ustx", [
        types.uint(1),
        types.uint(100000000),
        types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacks-mfers-stxnft-commission')
      ], deployer.address),
      Tx.contractCall("stacks-mfers", "list-in-ustx", [
        types.uint(1),
        types.uint(100000000),
        types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacks-mfers-stxnft-commission')
      ], wallet_1.address)
    ]);
    block.receipts[0].result.expectErr().expectUint(104);
    block.receipts[1].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "buy-in-ustx", [
        types.uint(1),
        types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacks-mfers-stxnft-commission')
      ], deployer.address),
      Tx.contractCall("stacks-mfers", "buy-in-ustx", [
        types.uint(1),
        types.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacks-mfers-stxnft-commission')
      ], deployer.address)
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectErr().expectUint(106);
  }
});

Clarinet.test({
  name: "stacks-mfers: mint all 4269 stacks-mfers",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let wallet_2 = accounts.get("wallet_2")!;
    let wallet_3 = accounts.get("wallet_3")!;
    let wallet_4 = accounts.get("wallet_4")!;
    let wallet_5 = accounts.get("wallet_5")!;
    let wallet_6 = accounts.get("wallet_6")!;
    let wallet_7 = accounts.get("wallet_7")!;
    let wallet_8 = accounts.get("wallet_8")!;
    let wallet_9 = accounts.get("wallet_9")!;

    let block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "toggle-sale-state", [], deployer.address),
    ]);

    for (let i = 0; i < 13; i += 1) {
      block = chain.mineBlock([
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_1.address),
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_2.address),
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_3.address),
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_4.address),
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_5.address),
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_6.address),
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_7.address),
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_8.address),
        Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_9.address),
      ]);
      block.receipts[0].result.expectOk();
      block.receipts[1].result.expectOk();
      block.receipts[2].result.expectOk();
      block.receipts[3].result.expectOk();
      block.receipts[4].result.expectOk();
      block.receipts[5].result.expectOk();
      block.receipts[6].result.expectOk();
      block.receipts[7].result.expectOk();
      block.receipts[8].result.expectOk();
    }

    let call = chain.callReadOnlyFn(
      "stacks-mfers",
      "get-last-token-id",
      [],
      wallet_1.address
    );
    call.result.expectOk().expectUint(4095);

    block = chain.mineBlock([
      Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_1.address),
      Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_1.address),
      Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_1.address),
      Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_2.address),
      Tx.contractCall("stacks-mfers", "claim-twenty-five", [], wallet_3.address),
      Tx.contractCall("stacks-mfers", "claim-ten", [], wallet_3.address),
    ]);

    call = chain.callReadOnlyFn(
      "stacks-mfers",
      "get-last-token-id",
      [],
      wallet_1.address
    );
    call.result.expectOk().expectUint(4269);
  },
});
