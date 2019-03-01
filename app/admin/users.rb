ActiveAdmin.register User do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :name, :username, :password, :company, :email, :telephone
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

  form do |f|
    f.inputs do
        f.input :name
        f.input :username
        f.input :company
        f.input :email
        f.input :telephone
        f.input :password
        f.input :password_confirmation
    end
    f.actions
  end

end
