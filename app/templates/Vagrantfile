# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vbguest.auto_update = false

  config.vm.box = "chef/centos-6.5"
  config.vm.box_url = "(virtualbox,"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.synced_folder "wordpress", "/var/www/html/wordpress"
  config.vm.synced_folder "static", "/var/www/html/static"

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
    ansible.sudo = false
  end
end
