# Debian ベースイメージを使用
FROM debian:bullseye-slim

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# utakataユーザーの作成
RUN useradd -m -s /bin/bash utakata

# Rustのインストール（システム全体）
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:$PATH"

# wasm-packのインストール
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Bunのインストール（utakataユーザーとして）
USER utakata
WORKDIR /home/utakata
RUN curl -fsSL https://bun.sh/install | bash

# 環境変数の設定
ENV PATH="/home/utakata/.bun/bin:/home/utakata/.cargo/bin:$PATH"
ENV RUSTUP_HOME="/home/utakata/.rustup"
ENV CARGO_HOME="/home/utakata/.cargo"

# Rustツールチェーンの設定
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
RUN rustup target add wasm32-unknown-unknown
RUN rustup component add rust-src

# Bunのバージョンを確認
RUN bun --version

# Node.jsの互換性のためのシンボリックリンク（rootに戻って実行）
USER root
RUN ln -s /home/utakata/.bun/bin/bun /usr/local/bin/node

# 作業ユーザーをutakataに設定
USER utakata
WORKDIR /workspace


