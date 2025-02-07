{ pkgs ? import <nixos-unstable> {} }:

  pkgs.mkShell {
    # nativeBuildInputs is usually what you want -- tools you need to run
    nativeBuildInputs = with pkgs.buildPackages; [ 

      nodejs
      haxe
      mmark
      xml2rfc
      esbuild

    ];

    shellHooks = ''
	export NIX_SHELL_XRSH=1
        echo -e "\n run: './make build' to build all (haxe parser + js)\n"
        echo -e "\n run: './make build javascript' to build js\n"
    '';
}


