#!/bin/bash
set -x
main_dir='/home/rkgv/nir_server_data'
jdir="$main_dir/jband"
hdir="$main_dir/Hband"
kdir="$main_dir/kband"
out_dir='nir_out'
j_out='nir_out/jband'
k_out='nir_out/kband'
h_out='nir_out/Hband'
homedir=''
start=0
end=0
outdir=''
mkdir $out_dir
mkdir $j_out
mkdir $k_out
mkdir $h_out
jstart=$1
shift
jend=$1
shift
kstart=$1
shift
kend=$1
shift 
hstart=$1
shift
hend=$1
shift
vot=$1
shift
for f in $*
	do
    	case $f in 
	    *j.dat) homedir=$jdir;start=$jstart;end=$jend;outdir=$j_out;;
	    *H.dat) homedir=$hdir;start=$hstart;end=$hend;outdir=$h_out;;
	    *k.dat) homedir=$kdir;start=$kstart;end=$kend;outdir=$k_out;;
        esac
	sed -n '/'"$start"'/,/'"$end"'/p' "$homedir/$f" | sed -e 's/^[ \t]*//' | tr -s ' ' > "$outdir/$f"
	done
if [ $vot = "y" ]
then
mkdir 'nir_out/VOTable'
mkdir 'nir_out/VOTable/jband'
mkdir 'nir_out/VOTable/kband'
mkdir 'nir_out/VOTable/Hband'
expect -f jband.expect
expect -f kband.expect
expect -f Hband.expect
fi
tar -czf "/usr/glassfish3/glassfish/domains/domain1/eclipseApps/nirlib/nir_out.tgz" "nir_out";
