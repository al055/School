import os

# Assignment OS hardening Script in a newly built linux OS


"""------------------------------------1------------------------------------"""
# install updates, incase there is a security update.

def update():
    os.system("apt-get update -y && apt-get upgrade -y")

update()


"""------------------------------------2------------------------------------"""
# disable ip forwarding

def no_ipfowarding():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.ip_forward = 0 \nnet.ipv6.conf.all.forwarding = 0\n")
    os.system("sysctl --system")

no_ipfowarding()


"""------------------------------------3------------------------------------"""
# make sure the cron scripts are only for root access

def root_cron():
    os.system("chmod 700 /etc/cron.hourly")
    os.system("chmod 700 /etc/cron.daily")
    os.system("chmod 700 /etc/cron.weekly")
    os.system("chmod 700 /etc/cron.monthly")

root_cron()


"""------------------------------------4------------------------------------"""
# set permission for securintg boot settings GRUB

def secure_grub():
    # set owner and group of file to root user
    os.system("chown root:root /boot/grub/grub.cfg")
    os.system("chmod 600 /boot/grub/grub.cfg")

secure_grub()


"""------------------------------------5------------------------------------"""
# disable USB storage
#https://linuxtechlab.com/disable-usb-storage-linux/

def disable_usb():
    disable_usb = "echo \"install usb-storage /bin/true \" >> /etc/modprobe.d/disable_usb_storage.conf"
    os.system(disable_usb)

disable_usb()


"""------------------------------------6------------------------------------"""
# disable cups

def disable_cups():
    os.system("echo \"systemctl stop cups \" >> /etc/bash.bashrc")

disable_cups()


"""------------------------------------7------------------------------------"""
# enable default firewall ufw service

def ufw_service():
    os.system("echo \"ufw enable \" >> /etc/bash.bashrc")
    os.system("echo \"ufw default deny incoming \" >> /etc/bash.bashrc")

ufw_service()


"""------------------------------------8------------------------------------"""
# make sure /etc/passwd, /etc/shadow is set to access only for root access

def root_permissions():
    os.system("chmod 600 /etc/passwd")
    os.system("chmod 600 /etc/passwd-")
    os.system("chmod 600 /etc/gshadow")
    os.system("chmod 600 /etc/gshadow-")
    os.system("chmod 600 /etc/shadow")
    os.system("chmod 600 /etc/shadow-")

root_permissions()
    

"""------------------------------------9------------------------------------"""
# enable the execshield (this is protection against buffer overflows)
# https://www.cyberciti.biz/faq/what-is-rhel-centos-fedora-core-execshield/


def enable_execshield():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nkernel.exec-shield = 1 \nkernel.randomize_va_space = 1 \n")
    os.system("sysctl --system")

enable_execshield()


"""------------------------------------10------------------------------------"""
# enable IP spoofing protetion
# https://www.linuxtopia.org/online_books/linux_system_administration/securing_and_optimizing_linux/chap5sec60.html
# we only need to focus on the sysctl.conf file. all the first sectio nof code is echo 

def IP_spoofing():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.conf.all.rp_filter = 1 \nnet.ipv4.default.rp_filter = 1")
    os.system("sysctl --system")

IP_spoofing()


"""------------------------------------11------------------------------------"""
# log all spoofed packets
# https://www.sciencedirect.com/topics/computer-science/spoofed-packet
# https://www.cyberciti.biz/faq/linux-log-suspicious-martian-packets-un-routable-source-addresses/

def log_spoof_pckt():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.conf.all.log_martians = 1 \nnet.ipv4.conf.default.log_martians = 1 \n")
    os.system("sysctl --system")

log_spoof_pckt()


"""------------------------------------12------------------------------------"""
# from the sysctl.conf appended to enable syn cookies
def enable_syn_protection():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.tcp_syncookies = 1 \nnet.ipv4.tcp_synack_retries = 5")
    os.system("sysctl --system")

enable_syn_protection()


"""------------------------------------13------------------------------------"""
# from the sysctl.conf disable redirects

def disable_ICMP_redirects():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.conf.all.accept_redirects = 0 \nnet.ipv6.conf.all.accept_redirects = 0")
    os.system("sysctl --system")

disable_ICMP_redirects()


"""------------------------------------14------------------------------------"""
# from the sysctl configureation file comments do not send the redirects

def no_send_ICMP_redirects():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\n net.ipv4.conf.all.send_redirects = 0")
    os.system("sysctl --system")

no_send_ICMP_redirects()


"""------------------------------------15------------------------------------"""
# from the sysctl.conf comments fo not acept IP source packet routing

def no_IP_source_routing():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.conf.all.accept_source_route = 0 \nnet.ipv6.conf.all.accept_source_route = 0")
    os.system("sysctl --system")

no_IP_source_routing()


"""------------------------------------16------------------------------------"""
#using sysctl -a in the vm i can see a list of all arguments
# USE https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt this is to see what it does
# disable icmp broadcast echos, icmp echo = ping

def ignore_ICMP_broadcast():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.icmp_echo_ignore_broadcasts = 1")
    os.system("sysctl --system")

ignore_ICMP_broadcast()


"""------------------------------------17------------------------------------"""
#using sysctl -a in the vm i can see a list of all arguments
# USE https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt this is to see what it does
# focus on thigs that look useful like, icmp echos

def ignore_ICMP_echos():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.icmp_echo_ignore_all = 1")
    os.system("sysctl --system")

ignore_ICMP_echos()


"""------------------------------------18------------------------------------"""
# from the sysctl -a 
# USE https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt this is to see what it does
# disable secure redirects, this system is not providing routing


def no_secure_redirects():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.conf.all.secure_redirects = 0")
    os.system("sysctl --system")

no_secure_redirects()

"""------------------------------------19------------------------------------"""
# from the sysctl -a 
# USE https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt this is to see what it does
# set the tcp_rfc1337
# https://tools.ietf.org/html/rfc1337

def tcp_rfc1337():
    with open('/etc/sysctl.conf', 'a+') as sysctl_conf:
        sysctl_conf.write("\nnet.ipv4.tcp_rfc1337 = 1")
    os.system("sysctl --system")

tcp_rfc1337


"""------------------------------------20------------------------------------"""
# disable the root account

def disable_root():
    os.system("passwd -l root")
    # to renable use (passwd -u root)
    
disable_root()
